import { formAction } from '~/form-action.server' /* path to your custom formAction */
import { makeDomainFunction } from 'domain-functions'
import { z } from 'zod'
import { UserForm } from "~/components/features/users/UserForm";
import { ActionArgs, ActionFunction, redirect } from "@remix-run/node"
import { db } from "~/db.server";
import { User } from "@prisma/client";


export function ErrorBoundary() {
    return (
        <div>
            something went real wrong!
        </div>
    );
}


const formSchema = z.object({
    name: z.string().min(1, { message: 'Please provide your name' }).trim(),
    email: z.string().min(1, { message: 'Please provide your email' }).trim(),
    city: z.string().min(1, { message: 'Please provide your city' }).trim(),
    state: z.string().min(1, { message: 'Please provide your state' }).trim(),
})

const mutation = makeDomainFunction(formSchema)(async (data) => (
    await db.user.create({ data })
))


export const action: ActionFunction = async ({ request }) =>
    formAction({
        request,
        schema: formSchema,
        mutation,
        successPath: '/users', /* path to redirect on success */
    })

export default function () {
    return <UserForm formSchema={formSchema} />
}