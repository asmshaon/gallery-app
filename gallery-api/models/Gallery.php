<?php

namespace app\models;

use yii\db\ActiveRecord;

class Gallery extends ActiveRecord
{
    public static function tableName()
    {
        return 'gallery_images';
    }

    public function fields()
    {
        return [
            'id',
            'name',
            'url',
            'user_id',
            'created_at',
        ];
    }
}
