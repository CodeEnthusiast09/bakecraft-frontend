import { SidebarItem, SidebarModule } from "@/interfaces";
import { useState } from "react";

// Utility function to check if a name matches the search query
const matchesSearch = (name: string, query: string) =>
  name.toLowerCase().includes(query.toLowerCase());

// Filter items based on search query
const filterItems = (items: SidebarItem[], query: string) =>
  items.filter((item) => matchesSearch(item.name, query));

// Filter and return modules with matching items
const filterModules = (modules: SidebarModule[], query: string) =>
  modules
    .map((module) => {
      const moduleMatches = matchesSearch(module.name, query); // Check if module name matches

      // If module name matches, show all items, otherwise filter the items
      const filteredItems = moduleMatches
        ? module.items
        : filterItems(module.items || [], query);

      // Return the module with all items if name matches, or filtered items
      return {
        ...module,
        items: filteredItems,
        name:
          moduleMatches || (filteredItems ? filteredItems.length > 0 : false)
            ? module.name
            : "",
      };
    })
    .filter(
      (module) =>
        module.name || (module?.items ? module.items.length > 0 : false)
    ); // Remove empty modules

// The custom hook to handle the search functionality
export const useSearchSidebarFilter = (sideBarModules: SidebarModule[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNavGroups, setFilteredNavGroups] =
    useState<SidebarModule[]>(sideBarModules);

  return {
    searchQuery,
    filteredNavGroups,
  };
};
