# Random stuff to be moved somewhere

## About saving ESI data locally

Some data fetched from ESI is saved in database (such as names and tickers for characters, corporations, and alliances). This introduces the problem of having to keep that data in sync and thus the amount of such data should be kept minimal. It is, however, very handy in some cases to be able to see, e.g., character and corporation names instead of only ID numbers.

Having local data also increases robustness when ESI is down. For example, corporation and alliance-based authentication allowlists do not have to be circumvented, if local data can be used as an alternative.
