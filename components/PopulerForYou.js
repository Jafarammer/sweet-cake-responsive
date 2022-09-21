import Image from "next/image";
import Link from "next/link";

export default function PopulerForYou() {
  return (
    <div>
      <Link href={"/Coming"}>
        <div className="row mt-4 mx-2">
          {[
            {
              name: "Soup",
              image: "/images/group-icon-1.png",
              link: "/populer/soup",
            },
            {
              name: "Chicken",
              image: "/images/group-icon-2.png",
              link: "/populer/chicken",
            },
            {
              name: "Dessert",
              image: "/images/group-icon-3.png",
              link: "/populer/dessert",
            },
            {
              name: "Seafood",
              image: "/images/group-icon-2.png",
              link: "/populer/seafood",
            },
          ].map((item, index) => (
            <div className="col-3" key={index}>
              <Image src={item?.image} alt="logo" width="70px" height="70px" />
              <p className="text-center text-muted">{item?.name}</p>
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
}
