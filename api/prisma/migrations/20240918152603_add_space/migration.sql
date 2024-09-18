-- CreateTable
CREATE TABLE "Space" (
    "id" SERIAL NOT NULL,
    "spaceName" TEXT NOT NULL,
    "websiteUrl" TEXT NOT NULL,
    "headerTitle" TEXT NOT NULL,
    "customMessage" TEXT NOT NULL,
    "Question" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Space_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Space_spaceName_key" ON "Space"("spaceName");
