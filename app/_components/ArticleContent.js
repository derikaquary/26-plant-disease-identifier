function ArticleContent({ article }) {
  const { title, source } = article;

  return (
    <div
      className={`h-[100px] w-[250px] bg-cover bg-center rounded-tr-2xl rounded-br-2xl ${
        source === "tips1"
          ? "bg-tips1"
          : source === "tips2"
          ? "bg-tips2"
          : "bg-tips3"
      }`}>
      <div className="bg-black/30 rounded-bl-2xl rounded-tl-2xl pl-2 text-xl h-full w-full flex justify-end items-end">
        <p>{title}</p>
      </div>
    </div>
  );
}

export default ArticleContent;
