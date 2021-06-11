<?php

namespace app\controllers;

use app\models\User;
use Exception;
use Throwable;
use Yii;
use yii\filters\VerbFilter;
use yii\web\Response;

class UserController extends BaseController
{
    public $useModel = 'app\models\User';

    public $enableCsrfValidation = false;

    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return array_merge(parent::behaviors(), [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'login' => ['POST'],
                    'logout' => ['POST'],
                ],
            ],
        ]);
    }

    /**
     * Login action.
     *
     * @return Response|string
     * @throws Exception|Exception
     */
    public function actionLogin()
    {
        $request = Yii::$app->request;

        try {
            $user = User::find()
                ->where(['email' => $request->post('email')])
                ->one();

            if (Yii::$app->getSecurity()->validatePassword($request->post('password'), $user->password)) {
                $user->access_token = Yii::$app->security->generateRandomString();
                $user->save();

                return $this->asJson($user);
            }
        } catch (Exception $exception) {
            throw new Exception('Email or Password is incorrect');
        }

        throw new Exception('Email or Password is incorrect');
    }

    /**
     * Login action.
     *
     * @return Response|string
     * @throws Exception
     */
    public function actionLogout()
    {
        $request = Yii::$app->request;

        try {
            $user = User::findIdentityByAccessToken($request->getHeaders()['access_token']);
            $user->access_token = null;
            $user->save();

            if ($user !== null) {
                $user->access_token = 'null';
                $user->save();

                return $this->asJson([
                    'message' => 'User logged out successfully'
                ]);
            }
        } catch (Exception $exception) {
            Yii::error($exception->getMessage());
        }

        return $this->asJson([
            'message' => 'Access token expired or invalid'
        ]);
    }
}
