import { ReactNode } from "react";
import { ScrollArea } from "../ui/scroll-area";

export default function PageContainer({
  children,
  scrollable = true,
}: Readonly<{
  children: ReactNode;
  scrollable?: boolean;
}>) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className="h-[calc(100dvh-52px)]">
          <div
            className="h-full  p-4 md:px-8"
            style={{
              maxWidth: "calc(100vw - 3rem)",
            }}
          >
            {children}
          </div>
        </ScrollArea>
      ) : (
        <div className="h-full  p-4 md:px-8">{children}</div>
      )}
    </>
  );
}
