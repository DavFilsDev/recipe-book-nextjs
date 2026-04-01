import { useState } from "react"
import recipesData from "@/data/recipes.json"
import RecipeList from "@/components/RecipeList"
import { Recipe } from "@/types/recipe"

export default function Home() {
  const [orderedRecipes, setOrderedRecipes] = useState<Recipe[]>(recipesData)
  const [favorites, setFavorites] = useState<Recipe[]>([])

  function handleToggleOrder() {
    setOrderedRecipes((prev) => [...prev].reverse())
  }

  function toggleFavorite(recipe: Recipe) {
    setFavorites((prev) => {
      const exists = prev.find((r) => r.id === recipe.id)

      if (exists) {
        return prev.filter((r) => r.id !== recipe.id)
      } else {
        return [...prev, recipe]
      }
    })
  }

  return (
    <div className="min-h-screen bg-[#f6f4f1] text-[#1a1a1a]">
      <header className="p-6 border-b bg-white flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Recipe Book</h1>

        <button
          onClick={handleToggleOrder}
          className="border px-3 py-1 rounded"
        >
          Reverse order
        </button>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        <h3>Favorites:</h3>

        <div className="grid grid-cols-4 gap-2 mb-6">
          {orderedRecipes.map((r) => {
            const isFavorite = favorites.some((f) => f.id === r.id)

            return (
              <label key={r.id} className="flex gap-2">
                <input
                  type="checkbox"
                  checked={isFavorite}
                  onChange={() => toggleFavorite(r)}
                />
                {r.id} - {r.name}
              </label>
            )
          })}
        </div>

        <RecipeList
          recipes={orderedRecipes}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      </main>
    </div>
  )
}