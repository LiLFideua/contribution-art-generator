const grid = document.querySelector("#grid"), script = document.querySelector("#script");
    const cells = Array.from({ length:53 * 7 }, (_, i) => false);
    function index(x,y) { return y * 53 + x; }
    function drawGrid() {
      grid.innerHTML = cells.map((on,i) => `<button class="cell ${on ? "on" : ""}" data-i="${i}" title="week ${i % 53}, day ${Math.floor(i / 53)}"></button>`).join("");
      buildScript();
    }
    function buildScript() {
      const start = new Date(document.querySelector("#start").value || new Date().toISOString().slice(0,10));
      const msg = document.querySelector("#message").value.replace(/"/g, "'");
      const lines = ["#!/usr/bin/env bash", "set -e", "git init"];
      cells.forEach((on,i) => {
        if (!on) return;
        const x = i % 53, y = Math.floor(i / 53), d = new Date(start);
        d.setDate(start.getDate() + x * 7 + y);
        lines.push(`GIT_AUTHOR_DATE="${d.toISOString()}" GIT_COMMITTER_DATE="${d.toISOString()}" git commit --allow-empty -m "${msg}"`);
      });
      script.value = lines.join("\\n");
    }
    grid.addEventListener("click", e => { const cell = e.target.closest(".cell"); if (!cell) return; cells[+cell.dataset.i] = !cells[+cell.dataset.i]; drawGrid(); });
    document.querySelector("#clear").onclick = () => { cells.fill(false); drawGrid(); };
    document.querySelector("#copy").onclick = () => navigator.clipboard.writeText(script.value);
    document.querySelector("#fill").onclick = () => {
      cells.fill(false);
      const canvas = document.createElement("canvas"), ctx = canvas.getContext("2d");
      canvas.width = 53; canvas.height = 7; ctx.fillStyle = "white"; ctx.font = "7px monospace"; ctx.fillText(document.querySelector("#text").value.toUpperCase(), 1, 6);
      const data = ctx.getImageData(0,0,53,7).data;
      for (let y = 0; y < 7; y++) for (let x = 0; x < 53; x++) cells[index(x,y)] = data[(y * 53 + x) * 4 + 3] > 0;
      drawGrid();
    };
    document.querySelectorAll("input").forEach(input => input.addEventListener("input", buildScript));
    const d = new Date(); d.setDate(d.getDate() - d.getDay()); document.querySelector("#start").value = d.toISOString().slice(0,10);
    drawGrid();

