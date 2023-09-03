import app from "./config/express";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Running at Port ${port}...`);
});
