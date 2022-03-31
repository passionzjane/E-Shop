exports.get404 = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
    path: "/404",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.get500 = (req, res, next) => {
  res.status(500).render("500", {
    pageTitle: "Error!",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  });
};



// exports.getCheckout = (req, res, next) => {
//   let products;
//   let total = 0;
//   req.user
//     .populate("cart.items.productId")
//     .execPopulate()
//     .then(async (user) => {
//       products = user.cart.items;
//       total = 0;
//       products.forEach((p) => {
//         if (p.productId) {
//           total += p.quantity * p.productId.price;
//         }
//       });
//       /*
//         const session =  await stripe.checkout.sessions.create({
//           payment_method_types: ["card"],
//           line_items: products.map((p) => {
//             if (p.productId) {  
//               return {
//                 name: p.productId.title,
//                 description: p.productId.description,
//                 amount: p.productId.price * 100,
//                 currency: "usd",
//                 quantity: p.quantity,
//               };
//             }
//           }),
//           success_url:
//             req.protocol + "://" + req.get("host") + "/checkout/success", // => http://localhost:3000
//           cancel_url: 
//           req.protocol + "://" + req.get("host") + "/checkout/cancel"
//         });

//         */

//       const lineItems = products
//         .map((p) => {
//           const { productId } = p;

//           if (p.productId !== null)
//             if (p.productId !== null && p.productId !== "") {
//               return {
//                 name: p.productId.title,
//                 description: p.productId.description,
//                 amount: p.productId.price * 100,
//                 currency: "usd",
//                 quantity: p.quantity,
//               };
//             }
//         })
//         .filter((i) => {
//           return i != null;
//         });

//       const session = await stripe.checkout.sessions.create({
//         line_items: lineItems,
//         mode: "payment",
//         success_url:
//           req.protocol + "://" + req.get("host") + "/checkout/success",
//         cancel_url: req.protocol + "://" + req.get("host") + "/checkout/cancel",
//       });
//     })
//     .then((session) => {
//       res.render("shop/checkout", {
//         path: "/checkout",
//         pageTitle: "Checkout",
//         products: products,
//         totalSum: total,
//         sessionId: session.id,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };