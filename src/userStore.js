export function createUserStore(){
    return{
        userLocation: [],
        addRecord(state,city){
            this.userLocation.push({
                state, city
            })

        },
        removeNote(){
            this.userLocation.state = null;
            this.userLocation.city = null;
        }
    }
}
