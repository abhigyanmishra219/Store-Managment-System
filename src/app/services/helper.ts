//@ts-nocheck
import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import prismaclient from "./prisma";
export async function getUserFromCookies() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    if (!token) {
      return null;
    }
    const data = verifyToken(token);
    if (!data?.id) {
      return null;
    }
    const user = await prismaclient.user.findUnique({
      where: {
        id: data?.id,
      },
      omit:{
        password:true
      }
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
