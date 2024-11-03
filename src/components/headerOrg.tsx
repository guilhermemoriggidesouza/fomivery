import Org from "~/domain/org"

export type HeaderOrgProps = {
    org: Org,
    url: string
}
export default function HeaderOrg({ org, url }: HeaderOrgProps) {
    return (
        <>
            <div className="w-full" style={{ backgroundColor: org.bgColor }}>
                <div className="flex p-4 items-center w-fit">
                    <div>
                        {org.icon && (<img src={org.icon} className="pl-4 w-28 h-18" />)}
                    </div>
                    <div className="mx-8" style={{ color: org.fontColor }}>
                        <p className="font-xl">
                            <b>{org.name}</b>
                        </p>
                        <p>{org.address}</p>
                    </div>
                </div>
                <hr />
            </div>
        </>
    )
}