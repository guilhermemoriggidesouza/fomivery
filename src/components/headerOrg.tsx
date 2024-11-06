import Org from "~/domain/org"

export type HeaderOrgProps = {
    org: Org,
    url: string
}
export default function HeaderOrg({ org, url }: HeaderOrgProps) {
    return (
        <>
            <div className="w-full" style={{ backgroundColor: org.bgColor }}>
                <div className="flex p-4 items-center">
                    <div className="w-[60px] h-[60px] shrink-0 grow-0">
                        {org.icon && (<img src={org.icon} className="rounded rounded-md object-cover w-[60px] h-[60px]" />)}
                    </div>
                    <div className="ml-2" style={{ color: org.fontColor }}>
                        <p className="text-xl">
                            <b>{org.name}</b>
                        </p>
                        <p className="text-sm">{org.address}</p>
                    </div>
                </div>
                <hr />
            </div>
        </>
    )
}