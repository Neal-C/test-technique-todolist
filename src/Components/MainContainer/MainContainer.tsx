import { ReactNode } from "react";

type MainContainerProps = {
    children: ReactNode
}

export function MainContainer(properties : MainContainerProps) {


    const {children} = properties;

    return (
    <main className="pt-16 pb-20 px-4 max-w-7xl mx-auto sm:px-6 lg:pb-28 lg:px-8">
        
    {children}
    </main>
    )

};