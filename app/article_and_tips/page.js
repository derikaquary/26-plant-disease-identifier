import { articles } from "@/app/_data/articles.js";
import Image from "next/image";
import title_image from "@/public/title_image.jpeg";
import ArticleContent from "../_components/ArticleContent";
import Navigation from "../_components/Navigation";
import Link from "next/link";

function ArticlesAndTips() {
  return (
    <div>
      <div className="relative h-[270px] w-full mb-6">
        <Image
          src={title_image}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          alt="night sky"
          className="absolute inset-0 object-cover brightness-100 rounded-tl-xl rounded-tr-xl rounded-br-3xl"
        />
        <h2 className="absolute bottom-3 left-3 text-5xl">Article and Tips</h2>
      </div>
      <div className="flex flex-col items-end gap-4">
        {articles.map((article) => (
          <Link
            href={` ${
              article.id === 1
                ? "/article_and_tips/care_plants"
                : article.id === 2
                ? "/article_and_tips/10_gardening_tips"
                : "/article_and_tips/plants_diseases"
            }`}
            key={article.id}>
            <ArticleContent article={article} key={article.id} />
          </Link>
        ))}
      </div>
      <Navigation />
    </div>
  );
}

export default ArticlesAndTips;
