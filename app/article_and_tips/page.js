import { articles } from "@/app/_data/articles.js";
import Image from "next/image";
import title_image from "@/public/title_image.jpeg";
import ArticleContent from "../_components/ArticleContent";
import Navigation from "../_components/Navigation";

function ArticlesAndTips() {
  return (
    <div className="absolute bottom-[25px] left-[25px] right-[25px] top-[25px] rounded-2xl border-r-2 border-t-2 border-white/40 bg-white/20 shadow-2xl text-white backdrop-blur-xl">
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
          <ArticleContent article={article} key={article.id} />
        ))}
      </div>
      <Navigation />
    </div>
  );
}

export default ArticlesAndTips;
