const User = require("../models/user");
const Sequelize = require("sequelize");
// const Op = Sequelize.Op;
// let Remaining = Slot.Remaining;

exports.signUpUser = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  User.create({
    email,
    name,
    password,
  })
    .then((response) => {
      res.json({ createdUser: true });
    })
    .catch((err) => {
      console.log(err);
      res.json(err.message);
    });
};
// exports.getBookings = (req, res, next) => {
//   Slot.findAll({ include: User })
//     .then((user) => {
//       res.json(user);
//     })
//     .catch((err) => console.log(err));
// };
// exports.deleteSlot = (req, res, next) => {
//   const userId = req.params.userID;
//   let slotID;
//   User.findByPk(userId)
//     .then((user) => {
//       if (!user) {
//         res.json([{ Deleted: false }]);
//       } else {
//         slotID = user.dataValues.SlotId;
//       }

//       return user.destroy();
//     })
//     .then(() => {
//       if (slotID != null) {
//         Slot.findByPk(slotID)
//           .then((slot) => {
//             slot.update({ Remaining: slot.Remaining + 1 });
//           })
//           .catch((err) => console.log(err));
//         res.json([{ Deleted: true }]);
//       }
//     })
//     .catch((err) => console.log(err));
// };

// exports.getSlots = (req, res, next) => {
//   Slot.findAll({ where: { Remaining: { [Op.gt]: 0 } } })
//     .then((slot) => {
//       res.json(slot);
//     })
//     .catch((err) => console.log(err));
// };
