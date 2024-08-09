import GoBackButton from "@/app/_components/GoBackButton";

function page() {
  return (
    <div className="relative">
      <div className="flex flex-col gap-6 px-2 py-2">
        <div className="bg-tips1 h-[200px] w-full bg-center bg-cover flex items-end rounded-2xl ">
          <div className="w-full h-full flex items-end bg-black/10 rounded-2xl">
            <h1 className="text-4xl">How to Care for Your Plants</h1>
          </div>
        </div>
        <p>
          Taking care of your plants involves a combination of several important
          factors to ensure they thrive and remain healthy. Here’s a
          comprehensive guide to help you provide the best care for your plants:
        </p>
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl">1. Watering</h2>
          <p>
            Watering is crucial for plant health. However, the amount and
            frequency of watering can vary depending on the type of plant and
            the environment.
          </p>
          <ul className="flex flex-col gap-2">
            <li>
              Frequency: Most indoor plants need watering once a week. Check the
              soil moisture by sticking your finger about an inch deep into the
              soil. If it feels dry, it’s time to water.
            </li>
            <li>
              Amount: Water thoroughly until it drains out of the bottom of the
              pot. Ensure your pots have drainage holes to prevent waterlogging.
            </li>
            <li>
              Type of Water: Use room temperature water. Some plants are
              sensitive to the chemicals in tap water, so consider using
              filtered or distilled water if necessary.
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl">2. Lighting</h2>
          <p>Different plants have varying light requirements</p>
          <ul className="flex flex-col gap-2">
            <li>
              Bright Light: Place near windows that receive direct sunlight, but
              be cautious of the intense midday sun which can scorch leaves.
            </li>
            <li>
              Indirect Light: Perfect for plants that prefer bright but diffused
              light. Use sheer curtains to filter the light.
            </li>
            <li>
              Low Light: Ideal for areas with limited natural light. These
              plants can thrive with minimal light.
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl">3. Soil and Fertilization</h2>
          <p>
            The right soil mix and regular fertilization are key to healthy
            plants.
          </p>
          <ul className="flex flex-col gap-2">
            <li>
              Soil: Use a well-draining potting mix. Specific plants may require
              specialized soil, such as cactus mix for succulents.
            </li>
            <li>
              Fertilization: Feed your plants with a balanced, water-soluble
              fertilizer every 4-6 weeks during the growing season (spring and
              summer). Reduce feeding in fall and winter.
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl">4. Pruning and Grooming</h2>
          <p>
            Regular pruning helps maintain plant shape and promotes healthy
            growth.
          </p>
          <ul className="flex flex-col gap-2">
            <li>
              Pruning: Remove dead or yellowing leaves and spent flowers to
              direct energy to healthy growth.
            </li>
            <li>
              Grooming: Wipe leaves with a damp cloth to remove dust and improve
              photosynthesis.
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl">5. Pest Control</h2>
          <p>
            Keep an eye out for common pests such as aphids, spider mites, and
            mealybugs.
          </p>
          <ul className="flex flex-col gap-2">
            <li>
              Inspection: Regularly check under leaves and along stems for signs
              of pests.
            </li>
            <li>
              Treatment: Use natural insecticidal soap or neem oil to treat
              infestations. Isolate affected plants to prevent the spread of
              pests.
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl">6. Repotting</h2>
          <p>
            Repot plants every 1-2 years to provide fresh soil and more room for
            growth.
          </p>
          <ul className="flex flex-col gap-2">
            <li>
              When to Repot: When roots start to outgrow the pot or when soil
              becomes compacted.
            </li>
            <li>
              How to Repot: Choose a pot that’s one size larger. Remove the
              plant from the old pot, gently loosen the roots, and place it in
              the new pot with fresh soil.
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl">7. Humidity and Temperature</h2>
          <p>
            Most indoor plants thrive in moderate humidity and stable
            temperatures.
          </p>
          <ul className="flex flex-col gap-2">
            <li>
              Humidity: Increase humidity by misting plants, using a humidifier,
              or placing plants on a tray of pebbles and water.
            </li>
            <li>
              Temperature: Keep plants away from drafts, air conditioning vents,
              and heaters. Maintain a consistent temperature between 60-75°F
              (15-24°C).
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl">Conclusion</h2>
          <p>
            Taking care of your plants is a rewarding process that enhances your
            living space and provides a sense of accomplishment. By
            understanding and meeting the specific needs of your plants, you can
            enjoy their beauty and benefits for years to come.
          </p>
        </div>
      </div>
      <GoBackButton />
    </div>
  );
}

export default page;
