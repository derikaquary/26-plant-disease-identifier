export default function sitemap() {
    return [
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/article_and_tips/10_gardening_tips`
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/article_and_tips/care_plants`
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/article_and_tips`
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/article_and_tips/plants_diseases`
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/plant_analyzer`
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`
        }
    ];
}
