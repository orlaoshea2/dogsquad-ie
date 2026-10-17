<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Submit multiple services in one atomic booking insert, deriving ownership only from validated bearer credentials; prevents partial carts and cross-account ownership.
- Customer account reads use authenticated server functions scoped to the current user; stored prices and shared balance helpers keep historical amounts and unpaid totals consistent.
