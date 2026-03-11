export const timer = async (time) => {
   await new Promise((resolve) => setTimeout(resolve, time * 1000));
};
