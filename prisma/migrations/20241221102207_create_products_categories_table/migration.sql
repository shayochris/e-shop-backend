-- CreateTable
CREATE TABLE "products_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "products_categories_id_idx" ON "products_categories"("id");

-- CreateIndex
CREATE INDEX "products_categories_name_idx" ON "products_categories"("name");
