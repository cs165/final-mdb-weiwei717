class MenuView
{
    constructor()
    {
        this.createButton = document.querySelector("#create");

        this._onCreate = this._onCreate.bind(this);

        this.createButton.addEventListener('click', this._onCreate);
    }

    async _onCreate()
    {
        const response = await fetch('/create', { method: 'POST'} );
        const result = await response.json();
        if(result)
        {
            window.location.href = `/id/${result.id}`;
        }
    }
}
