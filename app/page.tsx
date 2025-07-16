import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import styles from "./page.module.css";
import { redirect } from "next/navigation";

async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/signup");
  }

  return (
    <div className={styles.container}>
      <div className={styles.credentials}>
        <p>Name: {session.user?.name}</p>
        <p>Email: {session.user?.email}</p>
      </div>

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
    </div>
  );
}

export default Page;
