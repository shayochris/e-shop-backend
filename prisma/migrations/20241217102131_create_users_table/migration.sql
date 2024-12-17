-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('CUSTOMER', 'ADMIN');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(200) NOT NULL,
    "last_name" VARCHAR(200) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "role" "Roles" NOT NULL DEFAULT 'CUSTOMER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_id_idx" ON "users"("id");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");
