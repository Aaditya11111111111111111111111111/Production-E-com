/**
 * Export an array of objects to a CSV file download.
 * @param {object[]} rows   - data rows
 * @param {string[]} columns - keys to include (in order)
 * @param {string}   filename - download filename (without .csv)
 */
export function exportCSV(rows, columns, filename = "export") {
  if (!rows.length) return;

  const header = columns.join(",");
  const body = rows.map((row) =>
    columns
      .map((col) => {
        const val = row[col] ?? "";
        // Wrap in quotes if value contains comma, quote or newline
        const str = String(val).replace(/"/g, '""');
        return /[,"\n]/.test(str) ? `"${str}"` : str;
      })
      .join(",")
  );

  const csv = [header, ...body].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/** Convenience: export products list */
export function exportProductsCSV(products) {
  exportCSV(
    products,
    ["id", "name", "category", "brand", "sku", "price", "discount", "stock", "status", "createdAt"],
    "products"
  );
}
