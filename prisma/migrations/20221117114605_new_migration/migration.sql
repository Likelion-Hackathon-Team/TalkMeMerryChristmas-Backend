-- CreateTable
CREATE TABLE "Message" (
    "messageID" SERIAL NOT NULL,
    "msgObjetId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "writer" VARCHAR(31) NOT NULL,
    "comment" VARCHAR(255),
    "commonVoice" VARCHAR(255) NOT NULL,
    "personalVoice" VARCHAR(255) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("messageID")
);

-- CreateTable
CREATE TABLE "Objet" (
    "objetId" SERIAL NOT NULL,
    "objetUrl" VARCHAR(255) NOT NULL,

    CONSTRAINT "Objet_pkey" PRIMARY KEY ("objetId")
);

-- CreateTable
CREATE TABLE "User" (
    "ownerId" SERIAL NOT NULL,
    "name" VARCHAR(31) NOT NULL,
    "userId" VARCHAR(31) NOT NULL,
    "password" VARCHAR(31) NOT NULL,
    "allVoiceUrl" VARCHAR(255),
    "cnt" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("ownerId")
);

-- CreateTable
CREATE TABLE "MsgObjet" (
    "msgObjetId" INTEGER NOT NULL,
    "objetId" INTEGER NOT NULL,
    "top" INTEGER,
    "left" INTEGER,

    CONSTRAINT "MsgObjet_pkey" PRIMARY KEY ("msgObjetId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "message_msgobjet_msgobjetid_fk" FOREIGN KEY ("msgObjetId") REFERENCES "MsgObjet"("msgObjetId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "message_user_ownerid_fk" FOREIGN KEY ("receiverId") REFERENCES "User"("ownerId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "MsgObjet" ADD CONSTRAINT "msgobjet_objet_objetid_fk" FOREIGN KEY ("objetId") REFERENCES "Objet"("objetId") ON DELETE NO ACTION ON UPDATE NO ACTION;
