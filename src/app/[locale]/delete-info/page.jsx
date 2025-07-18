import React from 'react'
import Link from 'next/link'
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
    CardFooter,
} from 'components/ui/card'
import { Button } from 'components/ui/button'
import { ShieldCheck, Trash2, HelpCircle } from 'lucide-react'

export const metadata = {
    title: 'Account Deletion & Data Retention | Proliga',
    description:
        'Learn what happens when you request to delete your Proliga account, what data is removed, and how long it takes (90 days).',
    robots: 'noindex, nofollow',
}

export default function DeleteInfoPage() {
    return (
        <main className="bg-background text-foreground">
            {/* Hero */}
            <section className="bg-gradient-to-br text from-primary via-secondary to-accent py-14 text-center text-primary">
                <h1 className="container mx-auto max-w-4xl px-4 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
                    Account Deletion & Data Retention Policy
                </h1>
                <p className="container mx-auto mt-4 max-w-2xl px-4 text-base sm:text-lg opacity-90">
                    Your privacy matters. This page explains what happens when you choose to delete your Proliga account.
                </p>
            </section>

            {/* Content */}
            <div className="container mx-auto max-w-4xl space-y-8 px-4 py-12">
                {/* Immediate Effects */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Trash2 className="text-destructive h-6 w-6" />
                            <CardTitle className="text-xl sm:text-2xl">What happens right away?</CardTitle>
                        </div>
                        <CardDescription>
                            As soon as you confirm deletion, your profile becomes inactive and is no longer visible to other users.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="prose prose-invert max-w-none">
                        <ul className="marker:text-primary list-inside list-disc space-y-2">
                            <li>Your login access is revoked immediately.</li>
                            <li>Any ongoing games or league participations are terminated.</li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Data scope */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="text-success h-6 w-6" />
                            <CardTitle className="text-xl sm:text-2xl">What data is deleted?</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="prose prose-invert max-w-none">
                        <p>We delete all personal and game-related information associated with your account, including:</p>
                        <ul className="marker:text-primary list-inside list-disc space-y-2">
                            <li>Profile details (name, email, phone, profile photo)</li>
                            <li>Game statistics, team information, and league history</li>
                            <li>Purchase and balance records</li>
                            <li>Saved preferences & settings</li>
                        </ul>
                        <p className="mt-4">
                            Aggregated or anonymised data that cannot be linked back to you may be retained for statistical purposes, in line with GDPR/CCPA guidelines.
                        </p>
                    </CardContent>
                </Card>

                {/* Restore */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <HelpCircle className="text-warning h-6 w-6" />
                            <CardTitle className="text-xl sm:text-2xl">Can I cancel my deletion request?</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="prose prose-invert max-w-none">
                        <p>
                            Yes. If you change your mind within the first <strong>30 days</strong>, simply log back in with your credentials or contact support and we will reactivate your account. After 30 days, restoration may no longer be possible.
                        </p>
                    </CardContent>
                </Card>

                {/* Contact */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl sm:text-2xl">Need help?</CardTitle>
                        <CardDescription>
                            Our support team is here to answer any questions about your data.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="prose prose-invert max-w-none">
                        <p>
                            Email us at{' '}
                            <a href="mailto:proliga.uz1@gmail.com" className="text-primary hover:underline">
                                proliga.uz1@gmail.com
                            </a>{' '}
                        </p>
                    </CardContent>
                    <CardFooter className="justify-end">
                        <Link href="/">
                            <Button variant="secondary">Back to Home</Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </main>
    )
}
