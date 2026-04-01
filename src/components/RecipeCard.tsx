import { useState } from "react"

export default function RecipeCard({
  recipe,
  favorites,
  toggleFavorite,
}: any) {
  const [pinned, setPinned] = useState(false)
  const [showDetail, setShowDetail] = useState(false)

  const isFavorite = favorites.some((r: any) => r.id === recipe.id)

  return (
    <>
      <article
        onClick={() => setShowDetail(true)}
        className={`bg-white rounded-lg border p-3 cursor-pointer ${
          pinned ? "border-green-700" : ""
        }`}
      >
        <img
          src={recipe.image}
          alt=""
          className="w-full aspect-[4/3] object-cover rounded"
        />

        <div className="mt-2 flex flex-col gap-1">
          <h2 className="font-semibold">{recipe.name}</h2>
          <span className="text-xs bg-gray-200 px-2 rounded">
            {recipe.category}
          </span>
          <p className="text-sm">{recipe.duration} min</p>

          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setPinned((p) => !p)
              }}
              className="border px-2 text-sm rounded"
            >
              {pinned ? "Unpin" : "Pin"}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleFavorite(recipe)
              }}
              className={`px-2 text-sm rounded border ${
                isFavorite ? "bg-blue-500 text-white" : ""
              }`}
            >
              Favorite
            </button>
          </div>
        </div>
      </article>

      {showDetail && (
        <div
          onClick={() => setShowDetail(false)}
          className="fixed inset-0 bg-black/50 flex justify-center items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded max-w-md w-full"
          >
            <div className="flex justify-between">
              <h2>{recipe.name}</h2>
              <button onClick={() => setShowDetail(false)}>X</button>
            </div>

            <p><strong>Category:</strong> {recipe.category}</p>
            <p><strong>Duration:</strong> {recipe.duration} min</p>

            <h4>Ingredients:</h4>
            <ul>
              {recipe.ingredients.map((ing: string, i: number) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>

            <h4>Steps:</h4>
            <ol>
              {recipe.steps.map((step: string, i: number) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </>
  )
}