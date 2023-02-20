import { rest } from "msw";
let object = [
  {
    date: Date.now(),
    brand: "any",
    transactionType: "any",
    totalOrders: 0,
    totalOrderValue: 0,
    grossMarginPercentage: 0,
  },
];

export const handlers = [
  rest.get(
    "http://localhost:8000/api/v1/brand_sales_daily",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(object));
    }
  ),
  rest.post(
    "http://localhost:8000/api/v1/brand_sales_daily",
    async (req, res, ctx) => {
      const data = await req.json();
      data.forEach((el: any) => {
        el["date"] = Date.now();
        object.push(el);
      });

      return res(ctx.status(200), ctx.text("ok"));
    }
  ),
];
