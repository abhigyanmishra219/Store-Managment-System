"use client";

import * as Tabs from "@radix-ui/react-tabs";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Separator from "@radix-ui/react-separator";

import AddUser from "./add-user";
import { GET_USER } from "../gql/queries";
import { gqlClient } from "../services/gql";
import { User } from "../../../generated/prisma";
import { useEffect, useState } from "react";
import DisplayCard from "./card";
import AddProduct from "./addproduct";
import Container from "./container-product";

export default function Admin() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data: { getAllUsers: User[] } = await gqlClient.request(GET_USER);
        setUsers(data?.getAllUsers || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Tabs for Navigation */}
      <Tabs.Root defaultValue="products" className="flex flex-col gap-6">
        <Tabs.List className="flex gap-2 border-b">
          <Tabs.Trigger
            value="products"
            className="px-4 py-2 text-sm font-medium rounded-t-lg data-[state=active]:border-b-2"
          >
            Products
          </Tabs.Trigger>
          <Tabs.Trigger
            value="users"
            className="px-4 py-2 text-sm font-medium rounded-t-lg data-[state=active]:border-b-2"
          >
            Users
          </Tabs.Trigger>
        </Tabs.List>

        {/* Products Tab */}
        <Tabs.Content value="products" className="rounded-xl p-6 border">
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">Add Product</h2>
              <AddProduct />
            </section>

            <Separator.Root className="h-px w-full" />

            <section>
              <h2 className="text-xl font-semibold mb-4">Product List</h2>
              <ScrollArea.Root className="w-full h-[500px] rounded-lg border">
                <ScrollArea.Viewport className="p-2">
                  <Container />
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation="vertical" className="flex p-0.5">
                  <ScrollArea.Thumb className="flex-1 rounded" />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>
            </section>
          </div>
        </Tabs.Content>

        {/* Users Tab */}
        <Tabs.Content value="users" className="rounded-xl p-6 border">
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">Add Member</h2>
              <AddUser />
            </section>

            <Separator.Root className="h-px w-full" />

            <section>
              <h2 className="text-xl font-semibold mb-4">Users</h2>
              <ScrollArea.Root className="w-full h-[400px] rounded-lg border">
                <ScrollArea.Viewport className="p-4">
                  <div className="grid gap-4">
                    {users.length > 0 ? (
                      users.map((user) => <DisplayCard key={user.id} user={user} />)
                    ) : (
                      <p className="text-sm opacity-70">No users found.</p>
                    )}
                  </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation="vertical" className="flex p-0.5">
                  <ScrollArea.Thumb className="flex-1 rounded" />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>
            </section>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
