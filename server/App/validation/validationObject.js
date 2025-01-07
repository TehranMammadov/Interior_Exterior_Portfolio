const { body, param, header } = require("express-validator");

const emailValidation = body("email")
  .trim()
  .notEmpty()
  .withMessage("Elektron ünvanınızı daxil edin !")
    .isEmail()
  .withMessage("Düzgün elektron ünvanınızı daxil edin !")

const messageValidation = body("message")
  .trim()
  .escape()
  .notEmpty()
  .withMessage("Mətn daxil edin !");

const passwordValidation = body(["password" || "confirmPassword"])
  .trim()
  .escape()
  .notEmpty()
  .withMessage("Şifrə daxil edin !")
  .isLength({ min: 5, max: 32 })
  .withMessage("Şifrənin uzunluğu minimum 5 olmalidir!")
  .isString()
  .withMessage("Şifrəni düzgün daxil edin !");

const roleNameValidation = body("roleName")
  .trim()
  .escape()
  .notEmpty()
  .withMessage("Vəzifə adını daxil edin !")
  .isString()
  .withMessage("Vəzifə adını düzgün daxil edin !")
  .isUppercase()
  .withMessage("İstifadəçi vəzifəsini böyük hərflərlə daxil edin !");

const url = body("url")
    .trim()
    .isString()
    .withMessage("Enter the url!");

const title = body("title")
  .trim()
  .escape()
  .isString()
  .withMessage("Blog başlığını daxil edin!");


const azTitle = body("azTitle")
    .trim()
    .escape()
    .unescape("'")
    .isString()
    .withMessage("Enter the title!");


const enTitle = body("enTitle")
    .trim()
    .escape()
    .unescape("'")
    .isString()
    .withMessage("Enter valid title!");

const ruTitle = body("ruTitle")
    .trim()
    .escape()
    .isString()
    .withMessage("Başlığı daxil edin!");

const description = body([
  "description" || "description1" || "description2" || "description3",
])
  .trim()
  .escape()
  .isString()
  .withMessage("Blog təsvirini düzgün daxil edin!");

const azDescription = body("azDescription")
    .trim()
    .escape()
    .unescape("'")
    .isString()
    .withMessage("Təsviri düzgün daxil edin!");

const enDescription = body("enDescription")
    .trim()
    .escape()
    .unescape("'")
    .isString()
    .withMessage("Enter valid description!");

const ruDescription = body("ruDescription")
    .trim()
    .escape()
    .isString()
    .withMessage("Blog təsvirini düzgün daxil edin!");


const portfolio_title = body("title")
    .trim()
    .escape()
    .isString()
    .withMessage("Portfolio başlığını daxil edin!");

const portfolio_description = body([
  "description" || "description1" || "description2" || "description3",
])
    .trim()
    .escape()
    .isString()
    .withMessage("Portfolio təsvirini düzgün daxil edin!");

const headerTitle = body("headerTitle")
  .trim()
  .escape()
  .isString()
  .withMessage("Blog başlığını daxil edin!");

const row = body("row")
  .trim()
  .escape()

const id = param("id")
  .trim()
  .escape()
  .isString()
  .withMessage("ID düzgün daxil edin!");

const category = body("category")
  .trim()
  .escape()
  .isString()
  .withMessage("Kateqoriyanı düzgün daxil edin!")
  .isUppercase()
  .withMessage("Keteqoriya adını böyük hərflərlə daxil edin!");


const categoryName = body("categoryName")
    .trim()
    .escape()
    .isString()
    .withMessage("Kateqoriyanı düzgün daxil edin!")
    .isUppercase()
    .withMessage("Keteqoriya adını böyük hərflərlə daxil edin!");

const blogDuration = body("duration")
  .trim()
  .escape()
  .isString()
  .withMessage("Müddəti düzgün daxil edin!");

const quote = body("quote")
  .trim()
  .escape()
  .isString()
  .withMessage("Mətni düzgün daxil edin!");

const phone = body("phone")
  .trim()
  .escape()
  .isNumeric()
  .withMessage("Telefon nömrəsini düzgün daxil edin!");

const language = header("accept-language")
  .trim()
  .escape()
  .isString()
  .withMessage("Header düzgün daxil edilməyib!")
  .whitelist(["en", "ru", "az"])
  .withMessage("Header düzgün daxil edilməyib!");

const main_title = body("title")
    .trim()
    .escape()
    .isString()
    .withMessage("Başlığını daxil edin!");

const main_title_extension = body("titleExtension")
    .trim()
    .escape()
    .isString()
    .withMessage("Başlığını daxil edin!");


const author = body("author")
    .trim()
    .escape()
    .isString()
    .withMessage("Avator adnını daxil edin!");


const spiker = body("spiker")
    .trim()
    .escape()
    .isString()
    .withMessage("Spikeri düzgün daxil edin!");

const place = body("place")
    .trim()
    .escape()
    .isString()
    .withMessage("Ünvanı düzgün daxil edin!");

const moduleObj = body("module")
    .escape()
    .isArray()
    .withMessage("Məlumatı düzgün daxil edin!");

const startDate = body("startDate")
    .trim()
    .escape()
    .isString()
    .withMessage("Tarixi düzgün daxil edin!");

const endDate = body("endDate")
    .trim()
    .escape()
    .isString()
    .withMessage("Tarixi düzgün daxil edin!");


module.exports = {
  spiker,
  place,
  startDate,
  endDate,
  emailValidation,
  messageValidation,
  passwordValidation,
  roleNameValidation,
  headerTitle,
  title,
  description,
  row,
  id,
  blogDuration,
  category,
  quote,
  phone,
  language,
  categoryName,
  portfolio_title,
  portfolio_description,
  main_title,
  main_title_extension,
  author,
  moduleObj,
  azTitle,
  enTitle,
  ruTitle,
  azDescription,
  enDescription,
  ruDescription,
  url
};
