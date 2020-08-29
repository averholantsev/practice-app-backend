-- СПРАВОЧНИКИ
-- ************************************** "public"."Files"
CREATE TABLE "public"."Files" (
  "id" uuid NOT NULL,
  "name" varchar(50) NOT NULL,
  "mimeType" varchar(50) NOT NULL,
  "extension" varchar(50) NULL,
  "path" varchar(200) NOT NULL,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NULL,
  CONSTRAINT "PK_file" PRIMARY KEY ("id")
);

-- ************************************** "public"."Users"
CREATE TABLE "public"."Users" (
  "id" integer NOT NULL,
  "login" varchar(50) NOT NULL,
  "password" varchar(50) NOT NULL,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NULL,
  CONSTRAINT "PK_users" PRIMARY KEY ("id")
);

-- ************************************** "public"."PracticeLanguages"
CREATE TABLE "public"."PracticeLanguages" (
  "id" uuid NOT NULL,
  "name" varchar(50) NOT NULL,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NULL,
  CONSTRAINT "PK_practicelanguage" PRIMARY KEY ("id")
);

-- ************************************** "public"."OrderStatuses"
CREATE TABLE "public"."OrderStatuses" (
  "id" uuid NOT NULL,
  "name" varchar(50) NOT NULL,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NULL,
  CONSTRAINT "PK_orderstatus" PRIMARY KEY ("id")
);

-- ************************************** "public"."PaymentMethods"
CREATE TABLE "public"."PaymentMethods" (
  "id" uuid NOT NULL,
  "name" varchar(50) NOT NULL,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NULL,
  CONSTRAINT "PK_paymethod" PRIMARY KEY ("id")
);

-- ************************************** "public"."PracticeCategories"
CREATE TABLE "public"."PracticeCategories" (
  "id" uuid NOT NULL,
  "name" varchar(50) NOT NULL,
  "parentId" uuid NULL,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NULL,
  CONSTRAINT "PK_practicecategory" PRIMARY KEY ("id"),
  CONSTRAINT "FK_64" FOREIGN KEY ("parentId") REFERENCES "public"."PracticeCategories" ("id")
);

CREATE INDEX "fkIdx_64" ON "public"."PracticeCategories" ("ParentId");

-- ОСНОВНЫЕ ТАБЛИЦЫ
-- ************************************** "public"."Customers"
CREATE TABLE "public"."Customers" (
  "id" uuid NOT NULL,
  "type" varchar(50) NOT NULL,
  "firstName" varchar(50) NOT NULL,
  "lastName" varchar(50) NULL,
  "phone" varchar(50) NOT NULL,
  "email" varchar(50) NOT NULL,
  "authorDescription" text NULL,
  "birthDate" date NULL,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NULL,
  "userId" integer NOT NULL,
  CONSTRAINT "PK_user" PRIMARY KEY ("id"),
  CONSTRAINT "FK_121" FOREIGN KEY ("userId") REFERENCES "public"."Users" ("id")
);

CREATE INDEX "fkIdx_121" ON "public"."Customers" ("userId");

-- ************************************** "public"."Orders"
CREATE TABLE "public"."Orders" (
  "id" uuid NOT NULL,
  "isShoppingCart" boolean NOT NULL,
  "purchaseDate" timestamp NULL,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NULL,
  "customerId" uuid NOT NULL,
  "orderStatusId" uuid NOT NULL,
  "paymentMethodId" uuid NULL,
  CONSTRAINT "PK_order" PRIMARY KEY ("id"),
  CONSTRAINT "FK_28" FOREIGN KEY ("customerId") REFERENCES "public"."Customers" ("id"),
  CONSTRAINT "FK_48" FOREIGN KEY ("orderStatusId") REFERENCES "public"."OrderStatuses" ("id"),
  CONSTRAINT "FK_92" FOREIGN KEY ("paymentMethodId") REFERENCES "public"."PaymentMethods" ("id")
);

CREATE INDEX "fkIdx_28" ON "public"."Orders" ("customerId");

CREATE INDEX "fkIdx_48" ON "public"."Orders" ("orderStatusId");

CREATE INDEX "fkIdx_92" ON "public"."Orders" ("paymentMethodId");

-- ************************************** "public"."Practices"
CREATE TABLE "public"."Practices" (
  "id" uuid NOT NULL,
  "name" varchar(50) NOT NULL,
  "description" text NULL,
  "price" decimal NOT NULL,
  "discount" numeric NULL,
  "creteDate" timestamp NOT NULL,
  "updateDate" timestamp NULL,
  "practiceAccess" boolean NOT NULL,
  "authorId" uuid NOT NULL,
  "practiceCategoryId" uuid NOT NULL,
  "practiceLanguageId" uuid NOT NULL,
  CONSTRAINT "PK_practice" PRIMARY KEY ("id"),
  CONSTRAINT "FK_19" FOREIGN KEY ("authorId") REFERENCES "public"."Customers" ("id"),
  CONSTRAINT "FK_57" FOREIGN KEY ("practiceCategoryId") REFERENCES "public"."PracticeCategories" ("id"),
  CONSTRAINT "FK_75" FOREIGN KEY ("practiceLanguageId") REFERENCES "public"."PracticeLanguages" ("id")
);

CREATE INDEX "fkIdx_19" ON "public"."Practices" ("authorId");

CREATE INDEX "fkIdx_57" ON "public"."Practices" ("practiceCategoryId");

CREATE INDEX "fkIdx_75" ON "public"."Practices" ("practiceLanguageId");

-- ДОЧЕРНИЕ ТАБЛИЦЫ
-- ************************************** "public"."OrderPractices"
CREATE TABLE "public"."OrderPractices" (
  "id" uuid NOT NULL,
  "finalPrice" decimal NOT NULL,
  "orderId" uuid NOT NULL,
  "practiceId" uuid NOT NULL,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NULL,
  CONSTRAINT "PK_orderpractice" PRIMARY KEY ("id"),
  CONSTRAINT "FK_81" FOREIGN KEY ("orderId") REFERENCES "public"."Orders" ("id"),
  CONSTRAINT "FK_84" FOREIGN KEY ("practiceId") REFERENCES "public"."Practices" ("id")
);

CREATE INDEX "fkIdx_81" ON "public"."OrderPractices" ("orderId");

CREATE INDEX "fkIdx_84" ON "public"."OrderPractices" ("practiceId");

-- ************************************** "public"."CustomerPractices"
CREATE TABLE "public"."CustomerPractices" (
  "id" uuid NOT NULL,
  "isWhishItem" boolean NOT NULL,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NULL,
  "customerId" uuid NOT NULL,
  "practiceId" uuid NOT NULL,
  CONSTRAINT "PK_userpractice" PRIMARY KEY ("id"),
  CONSTRAINT "FK_38" FOREIGN KEY ("customerId") REFERENCES "public"."Customers" ("id"),
  CONSTRAINT "FK_41" FOREIGN KEY ("practiceId") REFERENCES "public"."Practices" ("id")
);

CREATE INDEX "fkIdx_38" ON "public"."CustomerPractices" ("customerId");

CREATE INDEX "fkIdx_41" ON "public"."CustomerPractices" ("practiceId");

-- ************************************** "public"."PracticeSteps"
CREATE TABLE "public"."PracticeSteps" (
  "id" uuid NOT NULL,
  "name" varchar(50) NOT NULL,
  "description" text NOT NULL,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NULL,
  "practiceId" uuid NOT NULL,
  "fileId" uuid NULL,
  CONSTRAINT "PK_practicestep" PRIMARY KEY ("id"),
  CONSTRAINT "FK_100" FOREIGN KEY ("practiceId") REFERENCES "public"."Practices" ("id"),
  CONSTRAINT "FK_110" FOREIGN KEY ("fileId") REFERENCES "public"."Files" ("id")
);

CREATE INDEX "fkIdx_100" ON "public"."PracticeSteps" ("practiceId");

CREATE INDEX "fkIdx_110" ON "public"."PracticeSteps" ("fileId");