
import SidebarMeeting from "@/components/SidebarMeeting";

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="relative">
            <div className="flex">
                <SidebarMeeting />

                <section className="flex min-h-screen flex-1 flex-col px-3 pb-6 pt-2 max-md:pb-14 sm:px-3">
                    <div className="w-full">
                        {children}
                    </div>
                </section>
            </div>

        </main>
    );
}
