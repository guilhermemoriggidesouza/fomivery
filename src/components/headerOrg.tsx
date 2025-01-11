import Org from "~/domain/org";

export type HeaderOrgProps = {
  org: Org;
  url: string;
};
export default function HeaderOrg({ org, url }: HeaderOrgProps) {
  return (
    <>
      <div className="w-full" style={{ backgroundColor: org.bgColor }}>
        <div className="flex items-center p-4">
          <div className="h-[60px] w-[60px] shrink-0 grow-0">
            {org.icon && (
              <img
                src={org.icon}
                className="h-[60px] w-[60px] rounded rounded-md object-cover"
              />
            )}
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
  );
}
