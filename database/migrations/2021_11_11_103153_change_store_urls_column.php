<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeStoreUrlsColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //This change requires Doctrine/dbal package to be installed
        Schema::table('users', function (Blueprint $table) {
            $table->string('store_urls')->nullable()->change();
        });
    }

    public function down()
    {
        //This change requires Doctrine/dbal package to be installed
        Schema::table('users', function (Blueprint $table) {
            $table->jsonb('store_urls')->change();
        });
    }
}
