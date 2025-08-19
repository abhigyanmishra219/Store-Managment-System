"use client";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import { useContext } from "react";
import { UserContext } from "./context/user-context";
import Image from "next/image";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className="flex justify-between items-center px-4 py-3 border-b  shadow-sm">
   
      <div className="flex items-center gap-2">
        <div className="relative h-10 w-10 rounded-full overflow-hidden">
          <Image
            fill
            src="https://cdn-icons-png.flaticon.com/512/12474/12474329.png"
            alt="Store Management Logo"
            className="object-contain"
          />
        </div>
        <Text size="4" weight="bold">
          Store Manager
        </Text>
      </div>

      
      <Box maxWidth="250px">
        <Card
          className="cursor-pointer transition-all duration-200 hover:shadow-md"
          variant="surface"
        >
          <Flex gap="3" align="center">
            <Avatar
              size="3"
              src={user?.avatar || ""}
              radius="full"
              fallback={user?.name?.charAt(0) || "U"}
            />
            <Box>
              <Text as="div" size="2" weight="bold" className="truncate">
                {user?.name || "User"}
              </Text>
              <Text as="div" size="2" color="gray" className="capitalize">
                {user?.role || "staff"}
              </Text>
            </Box>
          </Flex>
        </Card>
      </Box>
    </header>
  );
}
