import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { headers } from "next/headers";

export const BreadCrumbs = async () => {
    const headersList = await headers();
    const paths = headersList.get("x-pathname");
    const pathNames = paths?.split("/").filter((path) => path);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {pathNames?.map((path, i) => (
                    <div className="flex items-center" key={i}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{path}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </div>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};
