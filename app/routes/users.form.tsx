import { UserForm } from "~/components/features/users/UserForm";
import { ActionArgs, redirect } from "@remix-run/node"
import { db } from "~/db.server";
import { User } from "@prisma/client";
export async function action({ request }: ActionArgs) {
    throw new Error('vishh')
    const data = Object.fromEntries(await request.formData())
    await db.user.create({ data: data as unknown as User })
    return redirect('/users')
}
export function ErrorBoundary() {
    return (
        <div>
            something went real wrong!
        </div>
    );
}
export default function () {
    return <UserForm />
}