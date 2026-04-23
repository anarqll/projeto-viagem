// Alternar a exibição do Dropdown
        function toggleDropdown() {
            document.getElementById("myDropdown").classList.toggle("show");
        }

        // Fechar o Dropdown se o usuário clicar fora dele
        window.onclick = function (event) {
            if (!event.target.matches('.btn-menu') && !event.target.matches('.fa-bars')) { }
        }
        function mostrarGaleria(pais) {
            // esconde todas as galerias

            document.querySelectorAll('.galeria').forEach(g => {
                g.style.display = 'none';
            });

            // se um páis for selecionado, mostra ele e rola a página

            if (pais !== '') {
                const alvo = document.getElementById(pais);
                if (alvo) {
                    alvo.style.display = 'block';
                    alvo.scrollIntoView();
                }
            }

        }

        // Função indepedente para voltar ao topo

        function voltarAoTopo() {
            window.scrollTo({
                top: 0,
            });
        }