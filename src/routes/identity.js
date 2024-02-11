const multer = require("fastify-multer");
const path = require("path");

const controller = require("../controllers/identity");
const check = require("../middlewares/check");

const fileFilter = (_, file, cb) => {
  const extName = path.extname(file.originalname);

  //// Allowed extension
  const allowedExt = /jpeg|jpg|png|webp|avif/;

  //// Check extension
  if (!allowedExt.test(extName)) {
    return cb({
      msg: "Only use allowed extension (jpeg, jpg, png, webp, and avif).",
    });
  }

  cb(null, true);
};

const limits = {
  fileSize: 204800,
};

const storage = multer.memoryStorage();

const memoryUpload = multer({ storage: storage, fileFilter, limits });

//// Identity routes
const identityRoute = (fastify, _, done) => {
  fastify.register((fastify, _, done) => {
    fastify.addHook("onRequest", async (request, reply) => {
      await check.access(request, reply);
      await check.allowedByRoles(["admin", "recruiter"], request, reply);
    });

    fastify.get("/", controller.getIdentity);
    done();
  });
  fastify.register((fastify, _, done) => {
    fastify.addHook("onRequest", async (request, reply) => {
      await check.access(request, reply);
      await check.allowedByRoles(["admin"], request, reply);
    });

    fastify.post("/create", controller.createIdentity);
    fastify.patch("/:id/update", controller.updateIdentity);
    fastify.register((fastify, _, done) => {
      //// Register fastify content parser
      fastify.register(multer.contentParser);

      fastify.patch(
        "/:id/update/picture",
        {
          preHandler: memoryUpload.single("picture"),
        },
        controller.updateIdentityPicture
      );
      done();
    });
    fastify.delete("/:id/delete", controller.deleteIdentity);
    done();
  });
  done();
};

module.exports = identityRoute;
