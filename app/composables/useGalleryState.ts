/**
 * Composable to persist gallery state (filters + active item) across navigation.
 * Used to restore scroll position when returning from a detail page.
 */
export const useGalleryState = () => {
  // ===== PEINTURES =====
  // Filter state - shared with index.vue via useState key
  const selectedCollection = useState<string>('peintures-filter-collection', () => '')
  const selectedTechnique = useState<string>('peintures-filter-technique', () => '')
  
  // Track the slug of the painting the user should scroll back to
  const activePaintingSlug = useState<string>('peintures-active-slug', () => '')

  // Build query params from current filters
  const filterQueryParams = computed(() => {
    const query: Record<string, string> = {}
    if (selectedCollection.value) query.collection = selectedCollection.value
    if (selectedTechnique.value) query.technique = selectedTechnique.value
    return query
  })

  // Build the "back to gallery" route with current filters
  const backToGalleryRoute = computed(() => ({
    path: '/peintures',
    query: filterQueryParams.value
  }))

  // ===== FOULARDS =====
  // Track the slug of the foulard the user should scroll back to
  const activeFoulardSlug = useState<string>('foulards-active-slug', () => '')

  return {
    // Peintures
    selectedCollection,
    selectedTechnique,
    activePaintingSlug,
    filterQueryParams,
    backToGalleryRoute,
    // Foulards
    activeFoulardSlug
  }
}
