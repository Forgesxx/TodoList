class ApiService
{
    constructor(baseUrl)
    {
        this.baseUrl = baseUrl;
    }

    async fetchData(endpoint, config)
    {
        try
        {
            const response = await fetch(`${this.baseUrl}/${endpoint}`, config);
            const result = await response.json();
            return result;
        }
        catch(error)
        {
            console.error(`Error when retrieving data from ${endpoint}:`, error);
            return null;
        }
    }

    async getAllItems()
    {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        return this.fetchData('getAllItems', config);
    }

    async deleteItem(id)
    {
        const config = {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([id,]),
        };

        await this.fetchData('deleteItem', config);
    }

    async addItem(item)
    {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([item,]),
        };

        await this.fetchData('addItem', config);
    }

    async changeItemText(id, newContent)
    {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                item: newContent,
            }),
        };

        await this.fetchData('setItem', config);
    }
}

export default ApiService;
