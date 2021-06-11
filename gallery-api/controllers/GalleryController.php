<?php

namespace app\controllers;

use app\models\Gallery;
use app\models\User;
use Aws\S3\S3Client;
use Exception;
use Yii;
use yii\filters\VerbFilter;

class GalleryController extends BaseController
{
    public $useModel = 'app\models\User';

    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return array_merge(parent::behaviors(), [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'upload' => ['POST'],
                    'home' => ['GET'],
                ],
            ],
        ]);
    }

    /**
     *
     */
    public function actionHome()
    {
        $request = Yii::$app->request;
        $user = User::findIdentityByAccessToken($request->getHeaders()['access_token']);

        $data = Gallery::find()
            ->where([
                'user_id' => $user->id
            ])
            ->all();

        return $this->asJson($data);
    }

    public function actionUpload()
    {
        $request = Yii::$app->request;
        $user = User::findIdentityByAccessToken($request->getHeaders()['access_token']);

        if (!empty($_FILES['image']) && $_FILES['image']['error'] == 0 && $_FILES['image']['size'] > 0) {
            $nameParts = explode('.', $_FILES['image']['name']);
            $ext = strtolower(end($nameParts));
            $imageName = sprintf('%s.%s', 'img_' . time(), $ext);
            $key = sprintf('%s/%s/%s', 'gallery', $user->id, $imageName);
            $allowed = ['gif', 'png', 'jpg', 'jpeg'];

            if (in_array($ext, $allowed) == false) {
                return $this->asJson([
                    'message' => 'Supported file extension are only .png, .jpg, .jpeg and .gif'
                ]);
            }

            try {
                $s3 = new S3Client([
                    'region' => 'ap-southeast-1',
                    'version' => 'latest',
                    'credentials' => [
                        'key' => "AKIA3Q3QGOSJKTGK2HMC",
                        'secret' => "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"
                    ]
                ]);
                $s3BucketName = 'dev-speshe-assets';
                $upload = $s3->putObject([
                    'Bucket' => $s3BucketName,
                    'Key' => $key,
                    'Body' => fopen($_FILES['image']['tmp_name'], 'rb')
                ]);

                $gallery = new Gallery();

                $gallery->user_id = $user->id;
                $gallery->name = $imageName;
                $gallery->url = $upload['ObjectURL'];
                $gallery->created_at = date('Y-m-d H:i:s');

                $gallery->save();

                return $this->asJson($gallery);
            } catch (Exception $exception) {
                Yii::error($exception->getMessage());
            }
        }

        return $this->asJson([
            'message' => 'Unable to upload image, please try again'
        ]);
    }
}
