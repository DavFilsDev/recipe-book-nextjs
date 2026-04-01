import { useState } from "react"
import RecipeCard from "./RecipeCard"
import { Recipe } from "@/types/recipe"

type Props = {
  recipes: Recipe[]
  favorites: Recipe[]
  toggleFavorite: (recipe: Recipe) => void
}

export default function RecipeList({
  recipes,
  favorites,
  toggleFavorite,
}: Props) {
  const [search, setSearch] = useState("")

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className="flex justify-center my-6">
        <input
          type="text"
          placeholder="Search recipe..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-1 rounded"
        />
      </div>

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] gap-5">
        {filteredRecipes.map((recipe, index) => (
          <li key={index}>
            <RecipeCard
              recipe={recipe}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          </li>
        ))}
      </ul>
    </>
  )
}