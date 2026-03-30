import { prisma } from "conflig/client";

const getProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

const getProductById = async (id: number) => {
  return await prisma.product.findUnique({
    where: { id },
  });
};

const addProductToCart = async (
  quantity: number,
  productId: number,
  user: Express.User,
) => {
  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
  });
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  if (cart) {
    //update
    //cap nhat sum gio hang
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        sum: {
          increment: quantity,
        },
      },
    });
    //cap nhat cart detail
    //neu chua co thi tao moi, co roi thi cap nhat
    const currentCartDetail = await prisma.cartDetail.findFirst({
      where: {
        productId: productId,
        cartId: cart.id,
      },
    });
    await prisma.cartDetail.upsert({
      where: { id: currentCartDetail?.id ?? 0 },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        price: product?.price ?? 0,
        quantity: quantity,
        productId: productId,
        cartId: cart.id,
      },
    });
  } else {
    //create
    await prisma.cart.create({
      data: {
        sum: quantity,
        userId: user.id,
        cartDetails: {
          create: [
            {
              price: product?.price ?? 0,
              quantity: quantity,
              productId: productId,
            },
          ],
        },
      },
    });
  }
};

const getProductInCart = async (userId: number) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (cart) {
    const currentCartDetail = await prisma.cartDetail.findMany({
      where: { cartId: cart.id },
      include: { product: true },
    });
    return currentCartDetail;
  }
  return [];
};

const DeleteProductInCart = async (
  cartDetailId: number,
  userId: number,
  sumCart: number,
) => {
  //xoa cart- detail
  await prisma.cartDetail.delete({
    where: { id: cartDetailId },
  });

  if (sumCart === 1) {
    //delete cart
    await prisma.cart.delete({
      where: { userId },
    });
  } else {
    //update cart
    await prisma.cart.update({
      where: { userId },
      data: {
        sum: {
          decrement: 1,
        },
      },
    });
  }
};
export {
  getProducts,
  getProductById,
  addProductToCart,
  getProductInCart,
  DeleteProductInCart,
};
