import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import { User } from "../../../generated/prisma";

export default function DisplayCard({user}:{user:User})
{
    return (
        <>
        <Box maxWidth="240px">
	<Card>
		<Flex gap="3" align="center">
			<Avatar
				size="3"
				src={user?.avatar}
				radius="full"
				fallback={user?.name?.charAt(0) || "U"}
			/>
			<Box>
				<Text as="div" size="2" weight="bold">
					 {user?.name || "User"}
				</Text>
				<Text as="div" size="2" color="gray">
					{user?.role || "staff"}
				</Text>
                <Text as="div" size="2" color="gray">
					{user?.email || "staff"}
				</Text>
                <Text as="div" size="2" color="gray">
					{user?.username || "staff"}
				</Text>
			</Box>
		</Flex>
	</Card>
</Box>

        </>
    )
}