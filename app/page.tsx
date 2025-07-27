"use client";

import styles from "./page.module.css";
import { LoginButton, LogoutButton } from "./auth";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div>
          <p>Name: {session?.user?.name}</p>
          <p>Email: {session?.user?.email}</p>
        </div>
        {session?.user?.image && (
          <img
            alt="user picture"
            src={session.user.image}
            width={80}
            height={80}
            style={{ borderRadius: "50%" }}
          />
        )}
      </div>

      {session ? <LogoutButton /> : <LoginButton />}
      {session && (
        <div className={styles.jaba}>
          <p>
            Уважаемый пользователь, вы получили уникальную возможность скачать
            фото жабы
          </p>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoJSCeN31NKiJTOUsR0xj210_NtwNWBbcIxw&s"
            alt="Жаба"
          />
        </div>
      )}
    </div>
  );
}
