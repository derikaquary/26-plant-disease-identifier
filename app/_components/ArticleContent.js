function ArticleContent({ article }) {
  const { title, source } = article;

  return (
    <div
      className={`h-[100px] w-[250px] bg-cover bg-center rounded-tl-2xl rounded-bl-2xl ${
        source === "tips1"
          ? "bg-tips1"
          : source === "tips2"
          ? "bg-tips2"
          : "bg-tips3"
      }`}>
      <p className="bg-black/40 mt-[52px] inline-block rounded-bl-2xl rounded-tl-2xl pl-2">
        {title}
      </p>
    </div>
  );
}

export default ArticleContent;
