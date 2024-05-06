import { Avatar, Dropdown } from 'flowbite-react';
import { signOut } from 'next-auth/react';

export default function AvatarComponent({
  name,
  email,
  image,
}: {
  name?: string;
  email?: string;
  image?: string;
}) {
  return (
    <Dropdown
      label={
        image ? (
          <Avatar
            alt="User settings"
            img={image}
            rounded
          />
        ) : (
          <Avatar rounded />
        )
      }
      arrowIcon={false}
      inline
    >
      {email ? (
        <>
          <Dropdown.Header>
            <span className="block text-sm">{name}</span>
            <span className="block truncate text-sm font-semibold">
              {email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item>View Profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={() => {
              signOut();
              localStorage.removeItem('user');
            }}
          >
            Sign out
          </Dropdown.Item>
        </>
      ) : null}
    </Dropdown>
  );
}
